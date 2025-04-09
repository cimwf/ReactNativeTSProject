//
//  BDSpeechModule.h
//  AwesomeTSProject
//
//  Created by Shan Guan on 2025/4/2.


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "BDSSpeechSynthesizer.h"
#import "ASRModule.h"

@interface BDSpeechModule : RCTEventEmitter <RCTBridgeModule, BDSSpeechSynthesizerDelegate>
@end
