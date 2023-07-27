//
//  CalendarManager.m
//  AwesomeTSProject
//
//  Created by Shan Guan on 2023/7/27.
//

#import "CalendarManager.h"

@implementation CalendarManager

RCT_EXPORT_MODULE(CalendarManagerModule);

RCT_EXPORT_METHOD(addEvent:(NSString *)name details:(NSDictionary *)details)
{
  NSLog(@"guanshan--%@", name);
  NSLog(@"guanshan--%@", details[@"location"]);
  NSLog(@"guanshan--%@", details[@"description"]);
  NSLog(@"guanshan--%@", details[@"isShow"]);
  NSLog(@"guanshan--%@", details[@"number"]);
  [self logHello];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"EventReminder" object:@{@"respMessage": @"123", @"respCode": @"456"}];

}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSString *str = @"guanshan-----ios";
  callback(@[str]);
}

- (void)logHello
{
  NSLog(@"guanshan-----Hello");
}

+ (void)logWorld
{
  NSLog(@"guanshan-----world");
}

- (NSDictionary *)constantsToExport
{
  return @{@"firstDayOfTheWeek": @"Monday", @"secondDayOfTheWeek": @"Tuesday"};
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSArray<NSString *> *)supportedEvents {
    NSMutableArray *arr = [[NSMutableArray alloc] init];

    [arr addObject:@"EventReminder"];

    return arr;
}

- (void)startObserving
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(handleSend:)
                                                 name:@"EventReminder"
                                               object:nil];
}

- (void)stopObserving
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void) handleSend:(NSNotification *)notification
{
    [self sendEventWithName:notification.name body:notification.object];
}

@end
