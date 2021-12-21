import SwiftUI

struct ExpenseList: View {
    @State var expenses = [Expense]()
    @State var fetching = false
    @State var total = 0
    @State var offset = 0
    @State var limit = 25
    
    func fetchExpenses(limit: Int, offset: Int) async throws {
        let (data, _) = try await URLSession.shared.data(
            from: URL(string: "http://localhost:3000/expenses?limit=\(limit)&offset=\(offset)")!
        )
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(formatter)
        let result = try decoder.decode(ExpensesResponse.self, from: data)
        expenses += result.expenses
        total = result.total
        self.offset = offset + limit
    }
    
    func fetchExpense(id: String) async throws -> Expense {
        let (data, _) = try await URLSession.shared.data(
            from: URL(string: "http://localhost:3000/expenses/\(id)")!
        )
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(formatter)
        return try decoder.decode(Expense.self, from: data)
    }
    
    func updateExpense(id: String) {
        Task {
            do {
                let expense = try await fetchExpense(id: id)
                if let index = expenses.firstIndex(where: { $0.id == id }) {
                    expenses[index] = expense
                }
            } catch let error {
                print(error)
            }
        }
    }
    
    func fetchPage() {
        guard !fetching else { return }
        fetching = true
        Task {
            do {
                try await fetchExpenses(limit: limit, offset: offset)
            } catch let error {
                print("Fetch expenses failed:", error)
            }
        }
        fetching = false
    }
    
    var body: some View {
        NavigationView {
            VStack {
                List {
                    ForEach(expenses, id: \.id) { expense in
                        NavigationLink {
                            ExpenseDetail(expense: expense) {
                                updateExpense(id: expense.id)
                            }
                        } label: {
                            ExpenseCell(expense: expense)
                        }
                    }
                    if (total > expenses.count && !fetching) {
                        Spacer().onAppear {
                            fetchPage()
                        }
                    }
                }
            }.navigationBarTitle("Expenses")
        }.onAppear {
            fetchPage()
        }
    }
}

struct ExpenseList_Previews: PreviewProvider {
    static var previews: some View {
        ExpenseList()
    }
}

struct User: Decodable {
    let first: String
    let last: String
    let email: String
}

struct Amount: Decodable {
    let value: String
    let currency: String
}

struct Receipt: Decodable {
    let url: String
}

struct Expense: Decodable {
    let id: String
    let amount: Amount
    let date: Date
    let merchant: String
    let receipts: [Receipt]
    let note: String
    let category: String
    let user: User
}

struct ExpensesResponse: Decodable {
    let expenses: [Expense]
    let total: Int
}



