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
  var date: String
  
  init(expense: Expense) {
    self.expense = expense
    let myDateString = "2016-01-01 04:31:32.0"
    
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss.A"
    let myDate = dateFormatter.date(from: myDateString)!
    
    dateFormatter.dateFormat = "MMM dd HH:mm"
    self.date = dateFormatter.string(from: myDate)
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
        Text(date)
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
