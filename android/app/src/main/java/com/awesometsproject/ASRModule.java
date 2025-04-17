package com.awesometsproject;

import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_ASR_VOLUME;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_ERROR;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_FINISHED;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_LONG_SPEECH_FINISHED;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_NONE;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_READY;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_RECOGNITION;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_SPEAKING;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_WAITING_READY;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_WAKEUP_EXIT;
import static com.baidu.aip.asrwakeup3.core.recog.IStatus.STATUS_WAKEUP_SUCCESS;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.baidu.aip.asrwakeup3.core.mini.AutoCheck;
import com.baidu.aip.asrwakeup3.core.recog.MyRecognizer;
import com.baidu.aip.asrwakeup3.core.recog.listener.IRecogListener;
import com.baidu.aip.asrwakeup3.core.recog.listener.MessageStatusRecogListener;
import com.baidu.aip.asrwakeup3.core.wakeup.MyWakeup;
import com.baidu.aip.asrwakeup3.core.wakeup.listener.IWakeupListener;
import com.baidu.aip.asrwakeup3.core.wakeup.listener.RecogWakeupListener;
import com.baidu.speech.asr.SpeechConstant;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ASRModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static ReactApplicationContext reactContext;

    private static final String TAG = "ASRModule";
    private DeviceEventManagerModule.RCTDeviceEventEmitter mEventEmitter;
    protected MyRecognizer myRecognizer;
    protected MyWakeup myWakeup;
    private boolean isListening = false;

    // 百度语音鉴权的信息
    private String APP_ID;
    private String APP_KEY;
    private String SECRET;

    @Override
    public String getName() {
        return "ASRModule";
    }

    public String getAppId(){ return APP_ID; }
    public String getAppKey(){ return APP_KEY; }
    public String getSecret(){ return SECRET; }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        // 如果之前调用过myRecognizer.loadOfflineEngine()， release()里会自动调用释放离线资源
        // 基于DEMO5.1 卸载离线资源(离线时使用) release()方法中封装了卸载离线资源的过程
        // 基于DEMO的5.2 退出事件管理器
        release();
        // BluetoothUtil.destory(this); // 蓝牙关闭
    }

    //释放资源
    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        release();
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
                    String message = autoCheck.obtainErrorMessage(); // autoCheck.obtainAllMessage();
                    // 可以用下面一行替代，在logcat中查看代码
                    Log.d(TAG, "AutoCheckMessage " + message);
                }
            }
        }
    }

    private void initPermission() {
        String permissions[] = {Manifest.permission.RECORD_AUDIO,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.INTERNET,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
        };

        ArrayList<String> toApplyList = new ArrayList<String>();

        for (String perm : permissions) {
            if (PackageManager.PERMISSION_GRANTED != ContextCompat.checkSelfPermission(reactContext, perm)) {
                toApplyList.add(perm);
                // 进入到这里代表没有权限.

            }
        }
        String tmpList[] = new String[toApplyList.size()];
        Activity currentActivity = getCurrentActivity();
        if (!toApplyList.isEmpty() & currentActivity != null) {
            ActivityCompat.requestPermissions(getCurrentActivity(), toApplyList.toArray(tmpList), 123);
        }
    }

    /**
     * 开始语音唤醒
     * 唤醒输入参数请参考百度语音文档
     * {@see https://ai.baidu.com/ai-doc/SPEECH/bkh07sd0m#%E5%94%A4%E9%86%92%E8%BE%93%E5%85%A5%E5%8F%82%E6%95%B0}
     */
    @ReactMethod
    public void startWakeUp() {
        Log.i(TAG, "*******startWakeUp****");
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(SpeechConstant.APP_ID, APP_ID);
        params.put(SpeechConstant.APP_KEY, APP_KEY);
        params.put(SpeechConstant.SECRET, SECRET);
        params.put(SpeechConstant.WP_WORDS_FILE, "assets:///WakeUp.bin");
        if (myWakeup != null) {
            myWakeup.start(params);
        }
    }

    /**
     * 基于DEMO唤醒词集成第4.1 发送停止事件
     */
    @ReactMethod
    public void stopWakeUp() {
        if (myWakeup != null) {
            myWakeup.stop();
        }
    }

    @ReactMethod
    public void startRecognition() {
        Log.i(TAG, "*******startRecognition********");
//        if (isListening) return;
        // DEMO集成步骤2.1 拼接识别参数： 此处params可以打印出来，直接写到你的代码里去，最终的json一致即可。
        final Map<String, Object> params = new HashMap<>();
        params.put(SpeechConstant.APP_ID, APP_ID);
        params.put(SpeechConstant.APP_KEY, APP_KEY);
        params.put(SpeechConstant.SECRET, SECRET);

        // params 也可以根据文档此处手动修改，参数会以json的格式在界面和logcat日志中打印
        Log.i(TAG, "设置的start输入参数：" + params);
        // 复制此段可以自动检测常规错误
        if (BuildConfig.DEBUG) {
            (new AutoCheck(reactContext.getApplicationContext(), new MyHandler(), false)).checkAsr(params);
        }

        // 这里打印出params， 填写至您自己的app中，直接调用下面这行代码即可。
        // DEMO集成步骤2.2 开始识别
        if (myRecognizer != null) {
            myRecognizer.start(params);
            isListening = true;
        }
    }

    @ReactMethod
    public void startLongSpeech() {
        Log.i(TAG, "*******startLongSpeech********");
        final Map<String, Object> params = new HashMap<>();
        params.put(SpeechConstant.APP_ID, APP_ID);
        params.put(SpeechConstant.APP_KEY, APP_KEY);
        params.put(SpeechConstant.SECRET, SECRET);
        params.put(SpeechConstant.BDS_ASR_ENABLE_LONG_SPEECH, true);

        if (myRecognizer != null) {
            myRecognizer.start(params);
            isListening = true;
        }
    }
    /**
     * 开始录音后，手动点击“停止”按钮。
     * SDK会识别不会再识别停止后的录音。
     * 基于DEMO集成4.1 发送停止事件 停止录音
     */
    @ReactMethod
    public void stopRecognition() {
        Log.i(TAG, "*******stopRecognition********");
        if (isListening) {
            myRecognizer.stop();
            isListening = false;
        }
    }

    @ReactMethod
    public void release() {
        if (myRecognizer != null) {
            myRecognizer.release();
            myRecognizer = null;
            isListening = false;
        }

        if (myWakeup != null) {
            myWakeup.release();
            myWakeup = null;
        }
    }

    public ASRModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void initModule(final ReadableMap options) {
        if (myRecognizer != null || isListening || options == null) {
            return;
        }
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

        Log.i(TAG, APP_ID);
        Log.i(TAG, APP_KEY);
        Log.i(TAG, SECRET);
        initPermission();
        // DEMO集成步骤 1.2 新建一个回调类，识别引擎会回调这个类告知重要状态和识别结果
        IRecogListener listener = new MessageStatusRecogListener(new ListenHandler(this));
        // DEMO集成步骤 1.1 1.3 初始化：new一个IRecogListener示例 & new 一个 MyRecognizer 示例,并注册输出事件
        myRecognizer = new MyRecognizer(reactContext, listener);

        IWakeupListener wakeUpListener = new RecogWakeupListener(new WakeUpHandler(this));
        myWakeup = new MyWakeup(reactContext, wakeUpListener);
    }

    static class ListenHandler extends Handler {
        private final WeakReference<ASRModule> baiduAsrModuleWeakReference;

        public ListenHandler(ASRModule baiduAsrModule) {
            this.baiduAsrModuleWeakReference = new WeakReference<>(baiduAsrModule);
        }

        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            ASRModule baiduAsrModule = this.baiduAsrModuleWeakReference.get();
            baiduAsrModule.handleMsg(msg);
        }
    }

    /**
     * 处理语音识别回调结果
     *
     * @param msg 语音识别结果
     */
    private void handleMsg(Message msg) {
        WritableMap params = Arguments.createMap();
        switch (msg.what) { // 处理MessageStatusRecogListener中的状态回调
            case STATUS_NONE:
                params.putInt("code", STATUS_NONE);
                params.putString("msg", "初始状态");
                break;
            case STATUS_FINISHED:
                params.putInt("code", STATUS_FINISHED);
                params.putString("msg", "识别一段话结束");
                break;
            case STATUS_READY:
                params.putInt("code", STATUS_READY);
                params.putString("msg", "引擎就绪，可以开始说话");
                break;
            case STATUS_SPEAKING:
                params.putInt("code", STATUS_SPEAKING);
                params.putString("msg", "检测到用户说话");
                break;
            case STATUS_RECOGNITION:
                params.putInt("code", STATUS_RECOGNITION);
                params.putString("msg", "检测到用户说话结束");
                break;
            case STATUS_LONG_SPEECH_FINISHED:
                params.putInt("code", STATUS_LONG_SPEECH_FINISHED);
                params.putString("msg", "长语音识别结束");
                break;
            case STATUS_ERROR:
                params.putInt("code", STATUS_ERROR);
                params.putString("msg", "语音识别错误");
            default:
                break;
        }

        if (msg.obj != null) {
            params.putString("data", msg.obj.toString());
        } else if (msg.what != STATUS_ASR_VOLUME) {
            params.putNull("data");
        }
        Log.i(TAG, params.toString());
        onJSEvent("onRecognizerResult", params);
    }

    private void onJSEvent(String eventName, Object data) {
        if (mEventEmitter == null) {
            mEventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mEventEmitter.emit(eventName, data);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }
    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    private void wakeupHandleMsg(Message msg) {
        WritableMap params = Arguments.createMap();
        Log.i(TAG, "*******wakeupHandleMsg********");
        switch (msg.what) {
            case STATUS_WAITING_READY:
                params.putInt("code", STATUS_WAITING_READY);
                params.putString("msg", "初始状态");
                break;
            case STATUS_WAKEUP_SUCCESS:
                params.putInt("code", STATUS_WAKEUP_SUCCESS);
                params.putString("msg", "唤醒成功");
                break;
            case STATUS_WAKEUP_EXIT:
                params.putInt("code", STATUS_WAKEUP_EXIT);
                params.putString("msg", "唤醒词识别结束");
                break;
            case STATUS_ERROR:
                params.putInt("code", STATUS_ERROR);
                params.putString("msg", "唤醒错误");
            default:
                break;
        }

        if (msg.obj != null) {
            params.putString("data", msg.obj.toString());
        } else {
            params.putNull("data");
        }
        Log.i(TAG, params.toString());
        if (msg.what == STATUS_ERROR) {
            onJSEvent("onWakeUpError", params);
        } else {
            onJSEvent("onWakeUpResult", params);
        }
    }

    static class WakeUpHandler extends Handler {
        private final WeakReference<ASRModule> baiduWakeUpModuleWeakReference;

        public WakeUpHandler(ASRModule baiduWakeUpModule) {
            this.baiduWakeUpModuleWeakReference = new WeakReference<>(baiduWakeUpModule);
        }

        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            ASRModule baiduWakeUpModule = this.baiduWakeUpModuleWeakReference.get();
            baiduWakeUpModule.wakeupHandleMsg(msg);
        }
    }
}
