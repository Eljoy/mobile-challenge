import SwiftUI

struct ContentView: View {
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
                        HStack {
                            ZStack {
                                Circle().foregroundColor(.red).frame(width: 40)
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
    
    var formatter: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .medium
        return formatter
    }
    
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
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

struct Expense: Decodable {
    let id: String
    let amount: Amount
    let date: Date
    let merchant: String
    let receipts: [String]
    let comment: String
    let category: String
    let user: User
}

struct ExpensesResponse: Decodable {
    let expenses: [Expense]
    let total: Int
}
