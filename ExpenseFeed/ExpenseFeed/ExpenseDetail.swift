//
//  ExpenseDetail.swift
//  ExpenseFeed
//
//  Created by Martin Wiingaard on 17/12/2021.
//

import SwiftUI
import UIKit

struct ExpenseDetail: View {
    let expense: Expense
    
    @State var note: String = ""
    @State var showImagePicker = false
    @State var image: UIImage?
    
    func saveReceipt(url: URL) {
        
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
                    }.padding(.bottom, 12)
                    ScrollView(.horizontal) {
                        HStack {
                            ForEach(["mojn", "lol"], id: \.self) { receipt in
                                Text(receipt)
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
            ImagePicker { saveReceipt(url: $0) }
        }
    }
    
    var formatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter
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
                receipts: [
                    "hello", "i'm", "martin"
                ],
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
