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
  var viewController: UIViewController?
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
      
      self.viewController = delegate?.rootViewController
      self.success = success
      
      receiptPhotoViewController.delegate = self
      self.viewController?.present(receiptPhotoViewController, animated: true)
      
    }
  }
  
  func onPhotoTaken(imageData: ImageData) {
    self.success?(["fileName": imageData.fileName, "uri": imageData.uri])
    self.success = nil
    self.viewController?.dismiss(animated: true)
  }
  
  func viewDidDisappear() {
    self.success?(["fileName": nil, "uri": nil])
  }
  
  override func supportedEvents() -> [String]! {
    return []
  }
}
