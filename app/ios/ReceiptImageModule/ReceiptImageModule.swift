//
//  ReceiptImageModule.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 30.07.2022.
//

import Foundation

@objc(ReceiptCamera)
class ReceiptCamera: RCTEventEmitter, ReceiptPhotoDelegate {
  var success: RCTPromiseResolveBlock?
  
  func onPhotoTaken(imageData: ImageData) {
    self.success?(["fileName": imageData.fileName, "uri": imageData.uri])
  }
  
  func photoReceived(_ uri: String) {
    print(uri)
  }
  
  var expense = Expense(
    id: "1",
    amount: Amount(value: "3.90", currency: "EUR"),
    date: "Wed Aug 03 2022 23:19:35 GMT+0400",
    merchant: "Zwipf"
  )
  
  @objc func makePhoto(_ expenseJSON: NSString,
                       success: @escaping RCTPromiseResolveBlock,
                       reject: RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      let delegate = UIApplication.shared.delegate as? AppDelegate
      let receiptPhotoViewController = ReceiptPhotoViewController()
      receiptPhotoViewController.delegate = self
      delegate?.rootViewController?.present(receiptPhotoViewController, animated: true)
      self.success = success
    }
  }
  
  override func supportedEvents() -> [String]! {
    return []
  }
}
