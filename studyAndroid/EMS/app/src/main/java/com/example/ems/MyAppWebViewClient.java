package com.example.ems;

import android.content.Intent;
import android.net.Uri;
import android.net.http.SslError;
import android.util.Log;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MyAppWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        Log.d("WebViewDebug", "Loading URL: " + url); // Add this line
        if(url.indexOf("2ifactory.com") > -1 ) {
            Log.d("WebViewDebug", "Loading in WebView: " + url);
            return false;
        }

        Log.d("WebViewDebug", "Opening in external browser: " + url);
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        view.getContext().startActivity(intent);
        return true;
    }

    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        // Handle the error
        Log.e("WebViewError", "Error: " + error.toString());
        // For more details on newer Android versions:
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            Log.e("WebViewError", "Error Code: " + error.getErrorCode());
            Log.e("WebViewError", "Description: " + error.getDescription());
            Log.e("WebViewError", "Failing URL: " + request.getUrl());
        }
    }

    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        // Handle SSL error
        handler.proceed(); // Ignore SSL certificate errors (not recommended for production)
    }
}
