#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ReceiptCamera, NSObject)
RCT_EXTERN_METHOD(makePhoto: (NSString *)expenseJSON success:(RCTPromiseResolveBlock)success
  reject: (RCTPromiseRejectBlock)reject)
@end
