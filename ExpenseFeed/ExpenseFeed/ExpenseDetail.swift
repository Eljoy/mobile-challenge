//
//  ExpenseDetail.swift
//  ExpenseFeed
//
//  Created by Martin Wiingaard on 17/12/2021.
//

import SwiftUI
import UIKit

let PROJECT_DIR = "/Users/martin/git/mobile-challenge/api"

struct ExpenseDetail: View {
    let expense: Expense
    
    @State var note: String = ""
    @State var showImagePicker = false
    @State var image: UIImage?
    
    var didUpdateExpense: (() -> ())?
    
    func saveReceipt(image: UIImage) {
        Task {
            _ = try? await URLSession.shared.data(for: formRequest(
                url: URL(string: "http://localhost:3000/expenses/\(expense.id)/receipts")!,
                image: image)
            )
            didUpdateExpense?()
        }
    }
    
    func saveNote() {
        Task {
            struct NoteRequest: Encodable {
                let note: String
            }
            var request = URLRequest(url: URL(string: "http://localhost:3000/expenses/\(expense.id)")!)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = try? JSONEncoder.init().encode(NoteRequest(note: note))
            _ = try? await URLSession.shared.data(for: request)
            didUpdateExpense?()
        }
    }
    
    var body: some View {
        ScrollView {
            VStack {
                VStack {
                    HStack {
                        VStack(alignment: .leading) {
                            Spacer()
                            HStack(alignment: .firstTextBaseline) {
                                Text(expense.amount.value).font(.title2)
                                Text(expense.amount.currency).font(.headline)
                            }
                            Text(expense.merchant).font(.largeTitle)
                                .padding(.bottom, 4)
                            Text(formatter.string(from: expense.date)).font(.caption)
                        }.padding([.leading, .bottom], 28)
                        Spacer()
                    }
                }
                .frame(height: 300)
                .background(Color(Colors.color(for: expense.user.first)))
                VStack {
                    TextField("Note...", text: $note).task {
                        note = expense.note
                    }.padding(.bottom, 12).onSubmit {
                        saveNote()
                    }
                    ScrollView(.horizontal) {
                        HStack {
                            ForEach(expense.receipts, id: \.url) { receipt in
                                Image(uiImage: UIImage(contentsOfFile: "\(PROJECT_DIR)/\(receipt.url)") ?? UIImage())
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .frame(width: 150, height: 150)
                                    .cornerRadius(12)
                            }
                            Button {
                                showImagePicker = true
                            } label: {
                                Image(systemName: "plus.circle")
                                    .font(.largeTitle)
                                    .foregroundColor(.black)
                                    .frame(width: 150, height: 150, alignment: .center)
                                    .background(Color(UIColor.secondarySystemBackground))
                                    .cornerRadius(12)
                            }
                        }
                    }
                }.padding(28)
            }
        }
        .ignoresSafeArea(edges: .vertical)
        .sheet(isPresented: $showImagePicker) {
            ImagePicker { saveReceipt(image: $0) }
        }
    }
    
    var formatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter
    }
    
    func formRequest(url: URL, image: UIImage) -> URLRequest {
        guard let data = image.jpegData(compressionQuality: 0.1) else { fatalError("Expected to be able to convert image to data") }
        let uuid = UUID().uuidString
        let CRLF = "\r\n"
        let type = "image/jpeg"
        let boundary = "----Boundary.\(uuid)"
        
        var body = Data()
        body.append(("--\(boundary)" + CRLF).data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\"receipt\"; filename=\"file.jpg\"\r\n".data(using: .utf8)!)
        body.append(("Content-Type: \(type)" + CRLF + CRLF).data(using: .utf8)!)
        body.append(data)
        body.append(CRLF.data(using: .utf8)!)
        body.append(("--\(boundary)--" + CRLF).data(using: .utf8)!)
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.timeoutInterval = 30.0
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        request.httpBody = body
        return request
    }
}

struct ExpenseDetail_Previews: PreviewProvider {
    static var previews: some View {
        ExpenseDetail(
            expense: .init(
                id: "123",
                amount: .init(
                    value: "1495.00",
                    currency: "EUR"
                ),
                date: .init(timeIntervalSince1970: 1639780202),
                merchant: "Apple Store",
                receipts: [],
                note: "",
                category: "",
                user: .init(
                    first: "John",
                    last: "Finklehorn",
                    email: "anna.finklehord@pleo.io"
                )
            )
        )
    }
}
