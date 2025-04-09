//
//  asr.h
//  AwesomeTSProject
//
//  Created by Shan Guan on 2025/3/31.
//
//
#import "BDSEventManager.h"
#import "BDSASRDefines.h"
#import "BDSASRParameters.h"
#import "BDSWakeupDefines.h"
#import "BDSWakeupParameters.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ASRModule : RCTEventEmitter <RCTBridgeModule>
extern NSString *APP_ID;
extern NSString *API_KEY;
extern NSString *SECRET_KEY;
@end

