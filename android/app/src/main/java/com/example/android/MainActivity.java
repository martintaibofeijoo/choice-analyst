package com.example.android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.android.Auxiliar.Establecimiento;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Establecimiento establecimiento = (Establecimiento) getIntent().getSerializableExtra("establecimiento");
    }
}
