//
//  ReceiptImageModule.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 30.07.2022.
//

import Foundation

@objc(ReceiptCamera)
class ReceiptCamera: RCTEventEmitter, ReceiptPhotoDelegate {
  var expense: Expense?
  
  var success: RCTPromiseResolveBlock?
  var viewController: UIViewController?
  
  @objc func makePhoto(_ expenseJSON: String,
                       success: @escaping RCTPromiseResolveBlock,
                       reject: RCTPromiseRejectBlock) -> Void {
    DispatchQueue.main.async {
      let delegate = UIApplication.shared.delegate as? AppDelegate
      let receiptPhotoViewController = ReceiptPhotoViewController()
     
      let jsonData = expenseJSON.data(using: .utf8)!
      self.expense = try! JSONDecoder().decode(Expense.self, from: jsonData)
      
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
