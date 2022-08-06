//
//  ReceipPhoto.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 31.07.2022.
//

import SwiftUI

struct ReceiptPhotoView: View {
  @StateObject var camera = CameraModel()
  
  var expense: Expense
  var onPhotoTaken:(ImageData)->()
  
  init(expense: Expense, onPhotoTaken: @escaping (ImageData)->()) {
    self.expense = expense
    self.onPhotoTaken = onPhotoTaken
  }
  
  func onPhotoTake() {
    Task {
      let imageData = await camera.takePic()
      let result = camera.savePic(imageData: imageData!)
      self.onPhotoTaken(result)
    }
  }
  
  var body: some View {
    ZStack(alignment: .bottom) {
      CameraPreview(camera: camera)
        .ignoresSafeArea(.all, edges: .all)
      
      VStack {
        Button(action: onPhotoTake, label: {
          Circle()
            .fill(Color.white)
            .shadow(color: Color(hex: 0x6B73A0, opacity: 0.1), radius: 10)
            .frame(width: 60, height: 60)
        }).padding()
        
        ExpenseCard(expense: expense)
      }
    }.onAppear(perform: {
      camera.setUp()
    })
  }
}

struct ReceiptPhotoView_Previews: PreviewProvider {
  
  static var previews: some View {
    ReceiptPhotoView(expense: Expense(
      id: "1",
      amount: Amount(value: "3.90", currency: "EUR"),
      formattedDate: "Wed Aug 03 2022 23:19:35 GMT+0400",
      merchant: "Zwipf"
    ), onPhotoTaken:{ (_) -> Void in })
  }
}
