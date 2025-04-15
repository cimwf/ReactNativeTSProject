//
//  BDSpeechModule.m
//  AwesomeTSProject
//
//  Created by Shan Guan on 2025/4/2.
//

#import "BDSpeechModule.h"
#import <AVFoundation/AVFoundation.h>

@implementation BDSpeechModule

NSString* SpeechAPP_ID = @"";
NSString* SpeechAPI_KEY = @"";
NSString* SpeechSECRET_KEY = @"";

RCT_EXPORT_MODULE(BDSpeechModule);

RCT_EXPORT_METHOD(initModule: (NSDictionary *) Config)
{
  SpeechAPP_ID = Config[@"APP_ID"];
  SpeechAPI_KEY = Config[@"API_KEY"];
  SpeechSECRET_KEY = Config[@"SECRET_KEY"];
}

RCT_EXPORT_METHOD(startSpeech: (NSString *)str)
{
  NSLog(@"guanshan----hello--123");
  [[BDSSpeechSynthesizer sharedInstance] setApiKey:SpeechAPI_KEY withSecretKey:SpeechSECRET_KEY];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:nil];
  [[BDSSpeechSynthesizer sharedInstance] setSynthParam:@(4) forKey:BDS_SYNTHESIZER_PARAM_SPEAKER];
  [[BDSSpeechSynthesizer sharedInstance] setSynthesizerDelegate:self];
  // 开始合成并播放
  NSError* speakError = nil;
  [[BDSSpeechSynthesizer sharedInstance] speakSentence:str withError:&speakError];
}

RCT_EXPORT_METHOD(stopSpeech)
{
  [[BDSSpeechSynthesizer sharedInstance] cancel];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[];
}


@end
