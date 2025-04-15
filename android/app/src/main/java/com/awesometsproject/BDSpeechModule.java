package com.awesometsproject;

import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.util.Pair;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.baidu.aip.asrwakeup3.core.control.InitConfig;
import com.baidu.aip.asrwakeup3.core.control.MySyntherizer;
import com.baidu.aip.asrwakeup3.core.control.NonBlockSyntherizer;
import com.baidu.aip.asrwakeup3.core.listener.UiMessageListener;
import com.baidu.aip.asrwakeup3.core.util.AutoCheck;
import com.baidu.aip.asrwakeup3.core.util.IOfflineResourceConst;
import com.baidu.aip.asrwakeup3.core.util.MainHandlerConstant;
import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class BDSpeechModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter mEventEmitter;
    private static final String TAG = "BDSpeechModule";
    // TtsMode.MIX; 离在线融合，在线优先； TtsMode.ONLINE 纯在线； TtsMode.OFFLINE 纯离线合成，需要纯离线SDK
    protected TtsMode ttsMode = IOfflineResourceConst.DEFAULT_SDK_TTS_MODE;
    // 主控制类，所有合成控制方法从这个类开始
    private MySyntherizer synthesizer;
    // 百度语音鉴权的信息
    private String APP_ID;
    private String APP_KEY;
    private String SECRET;

    @NonNull
    @Override
    public String getName() {
        return TAG;
    }

    public BDSpeechModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void initModule(final ReadableMap options) {
        if (synthesizer != null) {
            return;
        }
        // 基于DEMO集成第1.1, 1.2, 1.3 步骤 初始化EventManager类并注册自定义输出事件
        if (options.hasKey("APP_ID")) {
            APP_ID = options.getString("APP_ID");
        } else {
            throw new RuntimeException("缺少鉴权信息APP_ID");
        }
        if (options.hasKey("API_KEY")) {
            APP_KEY = options.getString("API_KEY");
        } else {
            throw new RuntimeException("缺少鉴权信息API_KEY");
        }
        if (options.hasKey("SECRET_KEY")) {
            SECRET = options.getString("SECRET_KEY");
        } else {
            throw new RuntimeException("缺少鉴权信息SECRET_KEY");
        }
        // 设置初始化参数
        // 此处可以改为 含有您业务逻辑的SpeechSynthesizerListener的实现类
        Handler mainHandler = new SynthesizerHandler(this);
        SpeechSynthesizerListener listener = new UiMessageListener(mainHandler);
        InitConfig config = getInitConfig(listener, options);
        synthesizer = new NonBlockSyntherizer(reactContext.getApplicationContext(), config, mainHandler); // 此处可以改为MySyntherizer 了解调用过程
    }

    private InitConfig getInitConfig(SpeechSynthesizerListener listener, final ReadableMap options) {
        Map<String, String> params = getParams(options);
        // 添加你自己的参数
        InitConfig initConfig;
        // appId appKey secretKey 网站上您申请的应用获取。注意使用离线合成功能的话，需要应用中填写您app的包名。包名在build.gradle中获取。
        initConfig = new InitConfig(APP_ID, APP_KEY, SECRET, ttsMode, params, listener);

        // 如果您集成中出错，请将下面一段代码放在和demo中相同的位置，并复制InitConfig 和 AutoCheck到您的项目中
        // 上线时请删除AutoCheck的调用
        if (BuildConfig.DEBUG) {
            AutoCheck.getInstance(reactContext.getApplicationContext()).check(initConfig, new MyHandler());
        }
        return initConfig;
    }

    @Override
    public void onHostResume() {}

    @Override
    public void onHostPause() {}

    @Override
    public void onHostDestroy() {
        release();
    }

    //释放资源
    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        release();
    }

    @ReactMethod
    public void release() {
        if (synthesizer != null) {
            synthesizer.release();
            // 这个垃圾东西貌似释放的不会很及时 立马再重新new一个会报错
            synthesizer = null;
        }
    }

    /**
     * 静态匿名内部类不会持有一个对外部类的隐式引用，因此Activity将不会被泄露
     */
    static class MyHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            if (msg.what == 100) {
                AutoCheck autoCheck = (AutoCheck) msg.obj;
                synchronized (autoCheck) {
                    String message = autoCheck.obtainDebugMessage();
                    Log.w("AutoCheckMessage", message);
                }
            }
        }
    }

    /**
     * 合成的参数，可以初始化时填写，也可以在合成前设置。
     * {@see https://ai.baidu.com/ai-doc/SPEECH/Pk8446an5}
     *
     * @return 合成参数Map
     */
    private Map<String, String> getParams(final ReadableMap options) {
        Map<String, String> params = new HashMap<>();
        if (options != null) {
            // 仅在线生效，在线的发音
            if (options.hasKey("PARAM_SPEAKER")) {
                params.put(SpeechSynthesizer.PARAM_SPEAKER, options.getString("PARAM_SPEAKER"));
            }
            // 在线合成的音量 。范围["0" - "15"], 不支持小数。 "0" 最轻，"15" 最响 默认 "5"
            if (options.hasKey("PARAM_VOLUME")) {
                params.put(SpeechSynthesizer.PARAM_VOLUME, options.getString("PARAM_VOLUME"));
            }
            // 在线合成的语速 。范围["0" - "15"], 不支持小数。 "0" 最慢，"15" 最快 默认 "5"
            if (options.hasKey("PARAM_SPEED")) {
                params.put(SpeechSynthesizer.PARAM_SPEED, options.getString("PARAM_SPEED"));
            }
            // 在线合成的语调 。范围["0" - "15"], 不支持小数。 "0" 最低沉， "15" 最尖 默认 "5"
            if (options.hasKey("PARAM_PITCH")) {
                params.put(SpeechSynthesizer.PARAM_PITCH, options.getString("PARAM_PITCH"));
            }
            // 不使用改参数即可。SDK与服务器音频传输格式，与 PARAMAUDIO_RATE参数一起使用。可选值为SpeechSynthesizer.AUDIO_ENCODE*， 其中SpeechSynthesizer.AUDIO_ENCODE_PCM为不压缩
            if (options.hasKey("PARAM_AUDIO_ENCODE")) {
                params.put(SpeechSynthesizer.PARAM_AUDIO_ENCODE, options.getString("PARAM_AUDIO_ENCODE"));
            }
            // 不使用改参数即可。SDK与服务器音频传输格式，与 PARAMAUDIO_ENCODE参数一起使用。可选值为SpeechSynthesizer.AUDIO_BITRATE*, 其中SpeechSynthesizer.AUDIO_BITRATE_PCM 为不压缩传输
            if (options.hasKey("PARAM_AUDIO_RATE")) {
                params.put(SpeechSynthesizer.PARAM_AUDIO_RATE, options.getString("PARAM_AUDIO_RATE"));
            }
        }
        return params;
    }

    static class SynthesizerHandler extends Handler {
        private final WeakReference<BDSpeechModule> baiduSynthesizerModuleWeakReference;

        public SynthesizerHandler(BDSpeechModule baiduSynthesizerModule) {
            this.baiduSynthesizerModuleWeakReference = new WeakReference<>(baiduSynthesizerModule);
        }

        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            BDSpeechModule baiduSynthesizerModule = this.baiduSynthesizerModuleWeakReference.get();
            baiduSynthesizerModule.handleMsg(msg);
        }
    }

    private void handleMsg(Message msg) {
        WritableMap params = Arguments.createMap();
        switch (msg.what) {
            case MainHandlerConstant.STATUS_NONE:
                params.putInt("code", MainHandlerConstant.STATUS_NONE);
                params.putString("msg", "初始状态");
                break;
            case MainHandlerConstant.INIT_SUCCESS:
                params.putInt("code", MainHandlerConstant.INIT_SUCCESS);
                params.putString("msg", "合成引擎初始化成功");
                break;
            case MainHandlerConstant.STATUS_SYNTHESIZE_START:
                params.putInt("code", MainHandlerConstant.STATUS_SYNTHESIZE_START);
                params.putString("msg", "开始合成");
                break;
            case MainHandlerConstant.STATUS_SYNTHESIZE_PROCESSING:
                params.putInt("code", MainHandlerConstant.STATUS_SYNTHESIZE_PROCESSING);
                params.putString("msg", "正在合成中");
                break;
            case MainHandlerConstant.STATUS_SYNTHESIZE_FINISH:
                params.putInt("code", MainHandlerConstant.STATUS_SYNTHESIZE_FINISH);
                params.putString("msg", "合成结束");
                break;
            case MainHandlerConstant.STATUS_SPEAK_START:
                params.putInt("code", MainHandlerConstant.STATUS_SPEAK_START);
                params.putString("msg", "开始播放");
                break;
            case MainHandlerConstant.STATUS_SPEAKING:
                params.putInt("code", MainHandlerConstant.STATUS_SPEAKING);
                params.putString("msg", "正在播放");
                break;
            case MainHandlerConstant.STATUS_SPEAK_FINISH:
                params.putInt("code", MainHandlerConstant.STATUS_SPEAK_FINISH);
                params.putString("msg", "播放结束");
                break;
            case MainHandlerConstant.STATUS_ERROR:
                params.putInt("code", MainHandlerConstant.STATUS_ERROR);
                params.putString("msg", "合成错误");
            default:
                break;
        }

        if (msg.obj != null) {
            params.putString("data", msg.obj.toString());
        } else {
            params.putNull("data");
        }

        if (msg.what == MainHandlerConstant.STATUS_ERROR) {
            onJSEvent("onSynthesizerError", params);
        } else {
            onJSEvent("onSynthesizerResult", params);
        }
    }

    /**
     * 合成并播放
     */
    @ReactMethod
    public void startSpeech(String text) {
        if (!TextUtils.isEmpty(text) && synthesizer != null) {
            int result;
            result = synthesizer.speak(text);
            Log.i(TAG, String.valueOf(result));
        }
    }

    /**
     * 批量播放
     *
     * @param textArray 字符串数组
     */
    @ReactMethod
    public void batchSpeech(final ReadableArray textArray) {
        if (textArray != null && textArray.size() != 0 && synthesizer != null) {
            List<Pair<String, String>> texts = new ArrayList<>();

            for (int i = 0; i < textArray.size(); i++) {
                texts.add(new Pair<>(textArray.getString(i), String.valueOf(i)));
            }
            synthesizer.batchSpeak(texts);
        }
    }

    /*
     * 停止合成引擎。即停止播放，合成，清空内部合成队列。
     */
    @ReactMethod
    public void stopSpeech() {
        if (synthesizer != null) {
            synthesizer.stop();
        }
    }

    /**
     * 发送事件给js层
     *
     * @param eventName 事件名
     * @param data      数据
     */
    private void onJSEvent(String eventName, Object data) {
        if (mEventEmitter == null) {
            mEventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mEventEmitter.emit(eventName, data);
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void addListener(String eventName) {}

    @ReactMethod
    public void removeListeners(Integer count) {}
}
