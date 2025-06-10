package com.example.webapp;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView myWeb;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myWeb = (WebView) findViewById(R.id.myWeb);
        myWeb.setBackgroundColor(getResources().getColor(R.color.teal_700));

        // Enable Javascript
        WebSettings webSettings = myWeb.getSettings();
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        webSettings.setDomStorageEnabled(true);
//        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadsImagesAutomatically(true);

        // Force links and redirects to open in the WebView instead of in a browser
        myWeb.setWebViewClient(new WebViewClient());

        // Stop local links and redirects from opening in browser instead of WebView
        myWeb.setWebViewClient(new MyAppWebViewClient());
    
        myWeb.loadUrl("http://192.168.30.213");
//        myWeb.loadUrl("file:///android_asset/www/index.html");

    }

    @Override
    public void onBackPressed() {
        if(myWeb.canGoBack()) {
            myWeb.goBack();
        } else {
            super.onBackPressed();
        }
    }
}