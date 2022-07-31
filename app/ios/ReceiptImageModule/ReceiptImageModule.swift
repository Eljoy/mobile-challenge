//
//  ReceiptImageModule.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 30.07.2022.
//

import Foundation

@objc(ReceiptImageModule)
class ReceiptImageModule: RCTEventEmitter {
  @objc func makePhoto(_ success: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      let delegate = UIApplication.shared.delegate as? AppDelegate
      let receiptPhotoViewController = ReceiptPhotoViewController()
      delegate?.rootViewController?.present(receiptPhotoViewController, animated: true)
      success([]);
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["ReceiptImage"]
  }
}
