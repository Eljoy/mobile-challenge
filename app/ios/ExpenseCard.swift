//
//  ExpenseCard.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 03.08.2022.
//

import Foundation
import SwiftUI

struct ExpenseCard: View {
  var expense: Expense
  
  init(expense: Expense) {
    self.expense = expense
  }
  
  var body: some View {
    HStack(spacing: 16) {
      Avatar(name: expense.merchant)
      VStack(alignment: .leading) {
        HStack {
          Text(expense.merchant)
            .font(.system(size: 14))
            .foregroundColor(.black)
            .frame(maxWidth: .infinity, alignment: .leading)
          
          Text("\(expense.amount.value) \(expense.amount.currency)")
            .foregroundColor(.black)
            .font(.system(size: 14))
        }
        Text(expense.formattedDate)
          .font(.caption)
          .foregroundColor(.gray)
      }
    }
    .scenePadding()
    .background(Color.white)
    .cornerRadius(8, corners: [.topLeft, .topRight])
    .frame(maxWidth: .infinity)
  }
}
