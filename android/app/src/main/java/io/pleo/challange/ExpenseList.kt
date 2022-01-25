package io.pleo.challange

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.ExperimentalUnitApi
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.okhttp.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.pleo.challange.ui.theme.shade000
import io.pleo.challange.ui.theme.shade900
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json


val httpClient: HttpClient = HttpClient(OkHttp) {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
            encodeDefaults = false
        })
    }
    defaultRequest {
//        contentType(ContentType.Application.Json)
        accept(ContentType.Application.Json)
    }
}

@ExperimentalUnitApi
@Composable
fun ExpenseList(navController: NavHostController) {

    var expenses by remember { mutableStateOf<List<Expense>>(arrayListOf()) }

    LaunchedEffect(Unit) {
        val htmlContent = httpClient.request {
            url("http://192.168.0.111:3000/expenses?limit=25&offset=0")
            method = HttpMethod.Get
        }
        val body: ExpensesResponse = htmlContent.body()
        expenses = body.expenses
    }

    Surface(color = shade000) {
        Column(Modifier.fillMaxSize()) {
            TopAppBar(
                title = {
                    Text(text = "Expenses")
                },
                backgroundColor = shade000,
                contentColor = shade900,
            )
            LazyColumn(Modifier.padding(10.dp)) {
                items(expenses) { expense ->
                    ExpenseRow(expense) {
                        val expenseJson = Json.encodeToString(expense)
                        navController.navigate("details?expense=${expenseJson}")
                    }
                }
            }
        }
    }
}


@Serializable
data class User(val first: String, val last: String, val email: String) {
    fun fullName(): String = "$first $last"
}

@Serializable
data class Amount(val value: String, val currency: String) {
    fun formatted(): String = "$value $currency"
}

@Serializable
data class Receipt(val url: String? = null)

@Serializable
data class Expense(
    val id: String,
    val amount: Amount,
    val date: String,
    val merchant: String,
    val receipts: List<Receipt>,
    val note: String,
    val category: String,
    val user: User
)

@Serializable
data class ExpensesResponse(val expenses: List<Expense>, val total: Int)

