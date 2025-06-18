package com.example.webview;

import android.annotation.SuppressLint;
import android.content.pm.PackageInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

public class MainActivity extends AppCompatActivity {
    private WebView myWebview;
    private boolean safeBrowsingIsInitialized;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        myWebview = (WebView) findViewById(R.id.webview);
        myWebview.setWebViewClient(new MyWebViewClient(this));

        safeBrowsingIsInitialized = false;

        if (WebViewFeature.isFeatureSupported(WebViewFeature.START_SAFE_BROWSING)) {
            WebViewCompat.startSafeBrowsing(this, new ValueCallback<Boolean>() {
                @Override
                public void onReceiveValue(Boolean success) {
                    safeBrowsingIsInitialized = true;
                    if (!success) {
                        Log.e("MY_APP_TAG", "Unable to initialize Safe Browsing!");
                    }
                }
            });
        }

        PackageInfo webViewPackageInfo = WebViewCompat.getCurrentWebViewPackage(null);
        assert webViewPackageInfo != null;
        Log.d("MY_APP_TAG", "WebView version: " + webViewPackageInfo.versionName);

        WebSettings webSettings = myWebview.getSettings();
        webSettings.setJavaScriptEnabled(true);

//        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        //you can force the WebView to use a desktop-size viewport
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);

        webSettings.setSupportMultipleWindows(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setDatabaseEnabled(true);

        myWebview.loadUrl("file:///android_asset/www/index.html");
//        myWebview.loadData("<html><body>Hello, world!</body></html>", "text/html", "UTF-8");
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // Check whether the key event is the Back button and if there's history.
        if ((keyCode == KeyEvent.KEYCODE_BACK) && myWebview.canGoBack()) {
            myWebview.goBack();
            return true;
        }
        // If it isn't the Back button or there's no web page history, bubble up to
        // the default system behavior. Probably exit the activity.
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if(myWebview.canGoBack()) {
            myWebview.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        // Checks whether a keyboard is available
        if (newConfig.keyboardHidden == Configuration.KEYBOARDHIDDEN_YES) {
            Toast.makeText(this, "Keyboard available", Toast.LENGTH_SHORT).show();
        } else if (newConfig.keyboardHidden == Configuration.KEYBOARDHIDDEN_NO){
            Toast.makeText(this, "No keyboard", Toast.LENGTH_SHORT).show();
        }
    }
}