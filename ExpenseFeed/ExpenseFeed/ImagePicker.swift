//
//  ImagePicker.swift
//  ExpenseFeed
//
//  Created by Martin Wiingaard on 18/12/2021.
//

import UIKit
import SwiftUI

// Copy and adopted from: https://github.com/appcoda/ImagePickerSwiftUI/blob/master/SwiftUIImagePicker/ImagePicker.swift
struct ImagePicker: UIViewControllerRepresentable {
    
    var sourceType: UIImagePickerController.SourceType = .photoLibrary
    let didPickImage: (URL) -> ()
    
    @Environment(\.presentationMode) private var presentationMode

    func makeUIViewController(context: UIViewControllerRepresentableContext<ImagePicker>) -> UIImagePickerController {
        let imagePicker = UIImagePickerController()
        imagePicker.sourceType = sourceType
        imagePicker.delegate = context.coordinator
        return imagePicker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: UIViewControllerRepresentableContext<ImagePicker>) {
        
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    final class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        
        var parent: ImagePicker
        
        init(_ parent: ImagePicker) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            
            if let url = info[UIImagePickerController.InfoKey.imageURL] as? URL {
                parent.didPickImage(url)
            }
            
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
}
