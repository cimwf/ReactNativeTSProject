//
//  BDSpeechModule.m
//  AwesomeTSProject
//
//  Created by Shan Guan on 2025/4/2.
//

#import "BDSpeechModule.h"
#import <AVFoundation/AVFoundation.h>

@implementation BDSpeechModule

RCT_EXPORT_MODULE(BDSpeechModule);

RCT_EXPORT_METHOD(startSpeech)
{
  NSLog(@"guanshan----hello--123");
  [[BDSSpeechSynthesizer sharedInstance] setApiKey:API_KEY withSecretKey:SECRET_KEY];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:nil];
  [[BDSSpeechSynthesizer sharedInstance] setSynthParam:@(4) forKey:BDS_SYNTHESIZER_PARAM_SPEAKER];
  [[BDSSpeechSynthesizer sharedInstance] setSynthesizerDelegate:self];
  // 开始合成并播放
  NSError* speakError = nil;
  [[BDSSpeechSynthesizer sharedInstance] speakSentence:@"简单点，该配合你的演出我演视而不见，别再比一个最爱你的人进行表演" withError:&speakError];
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
