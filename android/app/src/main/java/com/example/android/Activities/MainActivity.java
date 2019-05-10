package com.example.android.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.android.Clases.Establecimiento;
import com.example.android.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Establecimiento establecimiento = (Establecimiento) getIntent().getSerializableExtra("establecimiento");
    }
}
