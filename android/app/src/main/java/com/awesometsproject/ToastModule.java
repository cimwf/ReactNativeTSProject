package com.awesometsproject;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import androidx.annotation.Nullable;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    @Override
    public String getName() {
        return "ToastExample";
    }

    public ToastModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void sendObject(ReadableMap obj) {
        System.out.println("guanshan-------sendObject");
        System.out.println(obj);

        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", "someValue");
        sendEvent(reactContext, "EventReminder", params);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
        System.out.println("guanshan-------addListener");
    }
    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
        System.out.println("guanshan-------removeListeners");
    }

}