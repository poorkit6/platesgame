package com.platesgame.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

public class MainActivity extends Activity {

    private static final String FOLDER = "PlatesGame";

    private static final String TEMPLATE =
            "# СВОИ МАШИНЫ ДЛЯ АВТОСАЛОНА\n"
          + "#\n"
          + "# Одна машина = одна строка в формате:\n"
          + "#   салон | цена | название | файл картинки\n"
          + "#\n"
          + "# Салон: низкий, средний, высокий, премиум или эксклюзив.\n"
          + "# Цена: числом, пробелы можно (5 000 000).\n"
          + "# Файл картинки: положите его в папку cars (она лежит рядом с этим файлом).\n"
          + "#   Если файл не указан, игра будет искать картинку с именем как у машины,\n"
          + "#   например cars/Моя машина.jpg (подойдут jpg, jpeg, png, webp).\n"
          + "# Строки, которые начинаются с #, игра пропускает.\n"
          + "#\n"
          + "# После изменений откройте в игре вкладку Автосалон и нажмите «Обновить список».\n"
          + "#\n"
          + "# Пример (уберите # в начале строки, чтобы включить):\n"
          + "# высокий | 5 000 000 | Моя машина | my-car.jpg\n";

    private WebView web;
    private boolean hadAccess;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        web.setBackgroundColor(0xFF0E1120);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setVerticalScrollBarEnabled(false);
        web.setHorizontalScrollBarEnabled(false);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);          // localStorage: сохранение прогресса
        s.setAllowFileAccess(true);
        s.setTextZoom(100);                    // размер системного шрифта не ломает вёрстку
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setMediaPlaybackRequiresUserGesture(false);

        hadAccess = hasAccess();
        seedFolder();

        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.setWebViewClient(new WebViewClient() {
            // cars.js и картинки из папки cars берём из PlatesGame на телефоне, если они там есть
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return serveFromFolder(request.getUrl());
            }
        });
        web.loadUrl("file:///android_asset/index.html");

        SharedPreferences prefs = getSharedPreferences("plates", MODE_PRIVATE);
        if (!hadAccess && !prefs.getBoolean("asked", false)) {
            prefs.edit().putBoolean("asked", true).apply();
            web.postDelayed(this::showAccessDialog, 800);
        }
    }

    // ---------- папка с пользовательскими данными ----------

    private boolean hasAccess() {
        if (Build.VERSION.SDK_INT >= 30) {
            return Environment.isExternalStorageManager();
        }
        return checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
    }

    private File dataDir() {
        if (hasAccess()) {
            return new File(Environment.getExternalStorageDirectory(), FOLDER);
        }
        File d = getExternalFilesDir(null);
        return d != null ? d : getFilesDir();
    }

    private void seedFolder() {
        try {
            File dir = dataDir();
            File cars = new File(dir, "cars");
            if (!cars.exists()) cars.mkdirs();
            File txt = new File(dir, "my_cars.txt");
            if (!txt.exists()) {
                try (FileOutputStream out = new FileOutputStream(txt)) {
                    out.write(TEMPLATE.getBytes(StandardCharsets.UTF_8));
                }
            }
            File names = new File(cars, "СПИСОК_ИМЁН.txt");
            {
                try (InputStream in = getAssets().open("cars/README.txt");
                     FileOutputStream out = new FileOutputStream(names)) {
                    byte[] buf = new byte[4096];
                    int n;
                    while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                }
            }
        } catch (Exception ignored) {
            // нет доступа к папке: игра продолжит работать со встроенными машинами
        }
    }

    private WebResourceResponse serveFromFolder(Uri uri) {
        try {
            if (!"file".equals(uri.getScheme())) return null;
            String path = uri.getPath();
            String prefix = "/android_asset/";
            if (path == null || !path.startsWith(prefix)) return null;
            String rel = path.substring(prefix.length());
            if (!(rel.equals("index.html") || rel.equals("cars.js") || rel.equals("containers.js") || rel.startsWith("cars/"))) return null;

            File dir = dataDir();
            File f = new File(dir, rel);
            if (!f.isFile()) return null;
            if (!f.getCanonicalPath().startsWith(dir.getCanonicalPath() + File.separator)) return null;
            return new WebResourceResponse(mime(rel), "UTF-8", new FileInputStream(f));
        } catch (Exception e) {
            return null;
        }
    }

    private static String mime(String name) {
        String n = name.toLowerCase(Locale.ROOT);
        if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "image/jpeg";
        if (n.endsWith(".png")) return "image/png";
        if (n.endsWith(".webp")) return "image/webp";
        if (n.endsWith(".gif")) return "image/gif";
        if (n.endsWith(".js")) return "application/javascript";
        return "application/octet-stream";
    }

    private void showAccessDialog() {
        new AlertDialog.Builder(this)
                .setTitle("Свои машины и картинки")
                .setMessage("Чтобы добавлять свои машины в автосалон без пересборки приложения, разрешите доступ к файлам. "
                        + "Игра создаст папку PlatesGame в памяти телефона. Без разрешения игра работает как обычно.")
                .setPositiveButton("Разрешить", (d, w) -> askAccess())
                .setNegativeButton("Позже", null)
                .show();
    }

    private void askAccess() {
        if (Build.VERSION.SDK_INT >= 30) {
            try {
                startActivity(new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION,
                        Uri.parse("package:" + getPackageName())));
            } catch (Exception e) {
                startActivity(new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION));
            }
        } else {
            requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        }
    }

    // ---------- мост для JavaScript ----------

    private class Bridge {
        @JavascriptInterface
        public String getCarsText() {
            return readFile("my_cars.txt");
        }

        // читать и писать можно только эти три файла в папке PlatesGame
        private boolean allowed(String name) {
            return "my_cars.txt".equals(name) || "my_containers.txt".equals(name) || "give.txt".equals(name) || "save.txt".equals(name);
        }

        @JavascriptInterface
        public String readFile(String name) {
            if (!allowed(name)) return "";
            try {
                File f = new File(dataDir(), name);
                if (!f.isFile()) return "";
                ByteArrayOutputStream bos = new ByteArrayOutputStream();
                try (InputStream in = new FileInputStream(f)) {
                    byte[] buf = new byte[4096];
                    int n;
                    while ((n = in.read(buf)) > 0) bos.write(buf, 0, n);
                }
                String text = new String(bos.toByteArray(), StandardCharsets.UTF_8);
                if (text.startsWith("\uFEFF")) text = text.substring(1);
                return text;
            } catch (IOException e) {
                return "";
            }
        }

        @JavascriptInterface
        public boolean writeFile(String name, String text) {
            if (!allowed(name)) return false;
            try {
                File dir = dataDir();
                if (!dir.exists()) dir.mkdirs();
                try (FileOutputStream out = new FileOutputStream(new File(dir, name))) {
                    out.write(text.getBytes(StandardCharsets.UTF_8));
                }
                return true;
            } catch (IOException e) {
                return false;
            }
        }

        // Режим правки кода: копия index.html из приложения кладётся в PlatesGame и дальше загружается оттуда
        @JavascriptInterface
        public boolean exportCode() {
            try {
                File dir = dataDir();
                if (!dir.exists()) dir.mkdirs();
                try (InputStream in = getAssets().open("index.html");
                     FileOutputStream out = new FileOutputStream(new File(dir, "index.html"))) {
                    byte[] buf = new byte[8192];
                    int n;
                    while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
                }
                return true;
            } catch (IOException e) {
                return false;
            }
        }

        @JavascriptInterface
        public boolean resetCode() {
            File f = new File(dataDir(), "index.html");
            return !f.exists() || f.delete();
        }

        @JavascriptInterface
        public boolean hasCustomCode() {
            return new File(dataDir(), "index.html").isFile();
        }

        @JavascriptInterface
        public String getFolder() {
            return dataDir().getAbsolutePath();
        }

        @JavascriptInterface
        public boolean hasAccess() {
            return MainActivity.this.hasAccess();
        }

        @JavascriptInterface
        public void requestAccess() {
            runOnUiThread(MainActivity.this::askAccess);
        }
    }

    // ---------- жизненный цикл ----------

    // Кнопка «Назад»: сначала закрываем окна и вкладки внутри игры, и только потом выходим
    @Override
    public void onBackPressed() {
        web.evaluateJavascript("window.__back ? window.__back() : false", value -> {
            if (!"true".equals(value)) {
                finish();
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        web.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
        boolean now = hasAccess();
        if (now != hadAccess) {          // разрешение только что выдали или забрали
            hadAccess = now;
            seedFolder();
            web.reload();
        }
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.destroy();
        }
        super.onDestroy();
    }
}
