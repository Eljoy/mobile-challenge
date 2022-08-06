//
//  Expense.swift
//  MobileChallenge
//
//  Created by Ilias Gazdaliev on 03.08.2022.
//

import Foundation

struct Expense: Codable {
  let id: String
  let amount: Amount
  let formattedDate, merchant: String
}

struct Amount: Codable {
  let value, currency: String
}
