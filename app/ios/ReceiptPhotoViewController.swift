//
//  SecondViewController.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 31.07.2022.
//

import UIKit
import SwiftUI

class ReceiptPhotoViewController: UIViewController {
  let contentView = UIHostingController(rootView: ReceiptPhotoView())
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .red
    addChild(contentView)
    view.addSubview(contentView.view)
    setupConstraints()
  }
  
  fileprivate func setupConstraints() {
    contentView.view.translatesAutoresizingMaskIntoConstraints = false
    contentView.view.topAnchor.constraint(equalTo:view.topAnchor).isActive = true
    contentView.view.bottomAnchor.constraint(equalTo:view.bottomAnchor).isActive = true
    contentView.view.leftAnchor.constraint(equalTo:view.leftAnchor).isActive = true
    contentView.view.rightAnchor.constraint(equalTo:view.rightAnchor).isActive = true
  }
}
