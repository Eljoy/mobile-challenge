#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(ReceiptImageModule, NSObject)
RCT_EXTERN_METHOD(makePhoto: (RCTPromiseResolveBlock)success
  reject: (RCTPromiseRejectBlock)reject)
@end
