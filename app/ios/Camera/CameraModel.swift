//
//  CameraModel.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 31.07.2022.
//

import AVFoundation
import SwiftUI

struct ImageData{
  let fileName, uri: String
}

class CameraModel: NSObject, ObservableObject, AVCapturePhotoCaptureDelegate{
  let cameraPhotoProcessor =  CameraPhotoProcessor()
  
  @Published var session = AVCaptureSession()
  
  @Published var output = AVCapturePhotoOutput()
  
  @Published var preview : AVCaptureVideoPreviewLayer!
  
  
  func setUp(){
    do{
      self.session.beginConfiguration()
      let device = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back)
      let input = try AVCaptureDeviceInput(device: device!)
      
      
      if self.session.canAddInput(input){
        self.session.addInput(input)
      }
      
      if self.session.canAddOutput(self.output){
        self.session.addOutput(self.output)
      }
      
      self.session.commitConfiguration()
    }
    catch{
      print(error.localizedDescription)
    }
  }
  
  func takePic() async -> UIImage? {
    let image = try? await self.cameraPhotoProcessor
      .startCapture(from: self.output, using: AVCapturePhotoSettings())
    return image
  }
  
  func savePic(imageData: UIImage) -> ImageData {
    let data = imageData.jpegData(compressionQuality: 0.75);
    
    let uniqueString = ProcessInfo.processInfo.globallyUniqueString
    
    let url = URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
      .appendingPathComponent(uniqueString, isDirectory: false)
      .appendingPathExtension("jpg")
    
    try? data!.write(to: url)
    
    return ImageData(fileName: "\(uniqueString).jpg", uri: url.path)
  }
}
