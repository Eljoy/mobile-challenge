package com.mobilechallenge.models

data class Amount(val value: String, val currency: String)

data class Expense(
  val id: String,
  val amount: Amount,
  val date: String,
  val merchant: String,
)
