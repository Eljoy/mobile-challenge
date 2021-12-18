//
//  ExpenseCellView.swift
//  ExpenseFeed
//
//  Created by Martin Wiingaard on 17/12/2021.
//

import SwiftUI

struct ExpenseCell: View {
    let expense: Expense
    
    var body: some View {
        HStack {
            ZStack {
                Circle().foregroundColor(Color(Colors.color(for: expense.user.first))).frame(width: 40)
                Text(expense.user.first.prefix(1).capitalized)
            }
            VStack(alignment: .leading) {
                Text(expense.merchant).font(.callout)
                Text(expense.user.first.capitalized + " " + expense.user.last.capitalized).font(Font.caption2)
            }
            Spacer()
            VStack(alignment: .trailing) {
                Text(expense.amount.value + " " + expense.amount.currency).font(.callout)
                Text(formatter.string(from: expense.date)).font(Font.caption2)
            }
        }
    }
    
    var formatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter
    }
}

struct ExpenseCell_Previews: PreviewProvider {
    static var previews: some View {
        ExpenseCell(
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
                    first: "Anna",
                    last: "Finklehorn",
                    email: "anna.finklehord@pleo.io"
                )
            )
        )
            .frame(height: 60)
            .previewLayout(.sizeThatFits)
    }
}

