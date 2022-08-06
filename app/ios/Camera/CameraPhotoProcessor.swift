//
//  CameraPhotoProcessor.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 06.08.2022.
//

import AVFoundation

enum CameraPhotoProcessorError: Error {
  case failToGetPhotoFileDataRepresentation
  
  case invalidPhotoData
}


class CameraPhotoProcessor: NSObject {
  
  private var imageContinuation: CheckedContinuation<UIImage, Error>?
  
  func startCapture(from photoOutput: AVCapturePhotoOutput, using settings: AVCapturePhotoSettings) async throws -> UIImage {
    return try await withCheckedThrowingContinuation { continuation in
      imageContinuation = continuation
      photoOutput.capturePhoto(with: settings, delegate: self)
    }
  }
}

extension CameraPhotoProcessor: AVCapturePhotoCaptureDelegate {
  func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
    if let error = error {
      imageContinuation?.resume(throwing: error)
      return
    }
    
    guard let data = photo.fileDataRepresentation() else {
      imageContinuation?.resume(throwing: CameraPhotoProcessorError.failToGetPhotoFileDataRepresentation)
      return
    }
    
    guard let image = UIImage(data: data) else {
      imageContinuation?.resume(throwing: CameraPhotoProcessorError.invalidPhotoData)
      return
    }
    imageContinuation?.resume(returning: image)
  }
}
