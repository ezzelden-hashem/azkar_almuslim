package com.ezzeldenh.azkar_almuslim;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
public class SplashActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTheme(androidx.core.splashscreen.R.style.Theme_SplashScreen);
        new Handler().postDelayed(() -> {
            startActivity(new Intent(this, MainActivity.class));
            finish();
        }, 1500);
    }
}
