package com.example.webview;

import static androidx.core.content.ContextCompat.startActivity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.webkit.SafeBrowsingResponseCompat;
import androidx.webkit.WebViewClientCompat;
import androidx.webkit.WebViewFeature;

public class MyWebViewClient extends WebViewClientCompat {

    private Activity activity = null;

    public MyWebViewClient(Activity activity) {
        this.activity = activity;
    }
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if(Uri.parse(url).getHost().length() == 0) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        view.getContext().startActivity(intent);
        return true;
    }
//    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
//        if ("journaldev.com".equals(request.getUrl().getHost())) {
//            // This is your website, so don't override. Let your WebView load the
//            // page.
//            return false;
//        }
//        // Otherwise, the link isn't for a page on your site, so launch another
//        // Activity that handles URLs.
//        Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
//        view.getContext().startActivity(intent);
//        return true;
//    }

    @Override
    public void onSafeBrowsingHit(WebView view, WebResourceRequest request,
                                  int threatType, SafeBrowsingResponseCompat callback) {
        // The "true" argument indicates that your app reports incidents like
        // this one to Safe Browsing.
        if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_RESPONSE_BACK_TO_SAFETY)) {
            callback.backToSafety(true);
            Toast.makeText(view.getContext(), "Unsafe web page blocked.",
                    Toast.LENGTH_LONG).show();
        }
    }
}
