//
//  asr.m
//  AwesomeTSProject
//
//  Created by Shan Guan on 2025/3/31.
//

#import "ASRModule.h"

@interface ASRModule () <BDSClientASRDelegate>{
    bool hasListeners;
}

@property (strong, nonatomic) BDSEventManager *asrEventManager;
@property (strong, nonatomic) BDSEventManager *wakeupEventManager;

@end


@implementation ASRModule

NSString* APP_ID = @"";
NSString* API_KEY = @"";
NSString* SECRET_KEY = @"";

RCT_EXPORT_MODULE(ASRModule);

RCT_EXPORT_METHOD(initModule: (NSDictionary *) Config)
{
  APP_ID = Config[@"APP_ID"];
  API_KEY = Config[@"API_KEY"];
  SECRET_KEY = Config[@"SECRET_KEY"];
}

RCT_EXPORT_METHOD(startRecognition)
{
  NSLog(@"guanshan-----Start");
  // 创建语音识别对象
  self.asrEventManager = [BDSEventManager createEventManagerWithName:BDS_ASR_NAME];
  // 设置语音识别代理
  [self.asrEventManager setDelegate:self];
  [self configModelVAD];
  // 参数配置：在线身份验证
  [self.asrEventManager setParameter:@[API_KEY, SECRET_KEY] forKey:BDS_ASR_API_SECRET_KEYS];
  //设置 APPID
  [self.asrEventManager setParameter:APP_ID forKey:BDS_ASR_OFFLINE_APP_CODE];
  // 发送指令：启动识别
  [self.asrEventManager sendCommand:BDS_ASR_CMD_START];
}

- (void)configModelVAD {
    NSString *modelVAD_filepath = [[NSBundle mainBundle] pathForResource:@"bds_easr_basic_model" ofType:@"dat"];
    [self.asrEventManager setParameter:modelVAD_filepath forKey:BDS_ASR_MODEL_VAD_DAT_FILE];
    [self.asrEventManager setParameter:@(YES) forKey:BDS_ASR_ENABLE_MODEL_VAD];
}

RCT_EXPORT_METHOD(stopRecognition)
{
  NSLog(@"guanshan-----END");
  [self.asrEventManager sendCommand:BDS_ASR_CMD_STOP];
}

RCT_EXPORT_METHOD(startWakeUp)
{
  NSLog(@"guanshan-----startWakeUp");
  // 创建语音识别对象
  self.wakeupEventManager = [BDSEventManager createEventManagerWithName:BDS_WAKEUP_NAME];
  // 设置语音唤醒代理
  [self.wakeupEventManager setDelegate:self];
  // 参数配置：离线授权APPID
  [self.wakeupEventManager setParameter:APP_ID forKey:BDS_WAKEUP_APP_CODE];
  // 参数配置：唤醒语言模型文件路径, 默认文件名为 bds_easr_basic_model.dat
  NSString* dat = [[NSBundle mainBundle] pathForResource:@"bds_easr_basic_model" ofType:@"dat"];
  NSString* words = [[NSBundle mainBundle] pathForResource:@"WakeUp" ofType:@"bin"];
//  NSString* words = [[NSBundle mainBundle] pathForResource:@"bds_easr_wakeup_words" ofType:@"dat"];
  [self.wakeupEventManager setParameter: dat forKey:BDS_WAKEUP_DAT_FILE_PATH];

  //设置唤醒词文件路径
  [self.wakeupEventManager setParameter:words forKey:BDS_WAKEUP_WORDS_FILE_PATH];
  // 发送指令：加载语音唤醒引擎
  [self.wakeupEventManager sendCommand:BDS_WP_CMD_LOAD_ENGINE];
  // 发送指令：启动唤醒
  [self.wakeupEventManager sendCommand:BDS_WP_CMD_START];
}

RCT_EXPORT_METHOD(stopWakeUp)
{
  [self.wakeupEventManager sendCommand:BDS_WP_CMD_STOP];
}

- (void)WakeupClientWorkStatus:(int)workStatus obj:(id)aObj
{
  if (aObj) {
    [self sendEvent:@"onWakeUpResult" body:@{@"workStatus": @(workStatus), @"data": aObj}.mutableCopy];
  }
}

- (void)VoiceRecognitionClientWorkStatus:(int)workStatus obj:(id)aObj
{
  if (aObj) {
    [self sendEvent:@"onRecognizerResult" body:@{@"workStatus": @(workStatus), @"data": aObj}.mutableCopy];
  }
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (void) sendEvent:(NSString *) name body:(NSDictionary *) body {
    [self sendEventWithName:name body:body];
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"onRecognizerResult",@"onWakeUpResult"];
}

@end
