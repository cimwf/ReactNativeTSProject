package com.baidu.aip.asrwakeup3.core.util;

/**
 * Created by fujiayi on 2017/9/13.
 */

public interface MainHandlerConstant {
    static final int UI_CHANGE_INPUT_TEXT_SELECTION = 1;
    static final int UI_CHANGE_SYNTHES_TEXT_SELECTION = 2;

    static final int STATUS_NONE = -1;
    // 成功初始化
    static final int INIT_SUCCESS = 0;

    // 开始合成
    static final int STATUS_SYNTHESIZE_START = 1;

    // 合成中
    static final int STATUS_SYNTHESIZE_PROCESSING = 2;

    // 合成结束
    static final int STATUS_SYNTHESIZE_FINISH = 3;

    // 开始播放
    static final int STATUS_SPEAK_START = 4;

    // 正在播放
    static final int STATUS_SPEAKING = 5;

    // 播放结束
    static final int STATUS_SPEAK_FINISH = 6;

    // 合成错误
    static final int STATUS_ERROR = 9;

    static final int PRINT = 10;
}
