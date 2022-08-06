//
//  SecondViewController.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 31.07.2022.
//

import UIKit
import SwiftUI

protocol ReceiptPhotoDelegate: AnyObject {
  func onPhotoTaken(imageData: ImageData) -> Void
  func viewDidDisappear() -> Void
  var expense: Expense { get set }
}

class ReceiptPhotoViewController: UIViewController {
  weak var delegate: ReceiptPhotoDelegate?
  
  lazy var contentView = {
    return UIHostingController(rootView: ReceiptPhotoView(
      expense: self.delegate!.expense,
      onPhotoTaken: self.delegate!.onPhotoTaken))
  }()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .red
    addChild(contentView)
    view.addSubview(contentView.view)
    setupConstraints()
  }
  
  override func viewDidDisappear(_ animated: Bool) {
    self.delegate?.viewDidDisappear()
  }
  
  fileprivate func setupConstraints() {
    contentView.view.translatesAutoresizingMaskIntoConstraints = false
    contentView.view.topAnchor.constraint(equalTo:view.topAnchor).isActive = true
    contentView.view.bottomAnchor.constraint(equalTo:view.bottomAnchor).isActive = true
    contentView.view.leftAnchor.constraint(equalTo:view.leftAnchor).isActive = true
    contentView.view.rightAnchor.constraint(equalTo:view.rightAnchor).isActive = true
  }
}
