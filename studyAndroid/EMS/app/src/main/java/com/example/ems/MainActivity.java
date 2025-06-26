package com.example.ems;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.os.Bundle;
import android.util.Log;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewCompat;

public class MainActivity extends Activity {

    private WebView myWeb;
    Context mContext;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myWeb = (WebView) findViewById(R.id.myWeb);

        CookieManager.getInstance().setAcceptThirdPartyCookies(myWeb, true);
//        myWeb.setBackgroundColor(getResources().getColor(R.color.black));

        // Enable Javascript
        WebSettings webSettings = myWeb.getSettings();
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        // Let the web view use JavaScript.
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccess(false);
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        // Let the web view access local storage.
        webSettings.setDomStorageEnabled(true);
        // Let HTML videos play automatically.
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        webSettings.setLoadWithOverviewMode(true);

        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setLoadsImagesAutomatically(true);

        PackageInfo webViewPackageInfo = WebViewCompat.getCurrentWebViewPackage(this);
        Log.d("MY_APP_TAG", "WebView version: " + webViewPackageInfo.versionName);


        // Force links and redirects to open in the WebView instead of in a browser
        myWeb.setWebViewClient(new WebViewClient());

        // Stop local links and redirects from opening in browser instead of WebView
        myWeb.setWebViewClient(new MyAppWebViewClient());

        myWeb.loadUrl("https://ems.2ifactory.com");
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