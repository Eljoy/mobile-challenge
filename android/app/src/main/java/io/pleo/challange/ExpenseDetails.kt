package io.pleo.challange

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.ExperimentalUnitApi
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.TextUnitType
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import coil.compose.rememberImagePainter
import io.ktor.client.*
import io.ktor.client.engine.okhttp.*
import io.ktor.client.plugins.*
import io.ktor.client.request.*
import io.ktor.client.request.forms.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.pleo.challange.ui.theme.color
import io.pleo.challange.ui.theme.shade000
import io.pleo.challange.ui.theme.shade400
import io.pleo.challange.ui.theme.shade900

@ExperimentalUnitApi
@Composable
fun ExpenseDetails(navController: NavHostController, expense: Expense) {

    var imageUri by remember {
        mutableStateOf<Uri?>(null)
    }
    var note by remember { mutableStateOf(expense.note) }
    val context = LocalContext.current

    LaunchedEffect(imageUri) {

        if (imageUri == null) {
            return@LaunchedEffect
        }

        val parts: List<PartData> = formData {
            append(
                "receipt", getFileFromUri(context, imageUri!!)!!.readBytes(),
                Headers.build {
                    append(HttpHeaders.ContentType, "image/png")
                    append(HttpHeaders.ContentDisposition, "filename=file.png")
                }
            )
        }

        httpClient.submitFormWithBinaryData(formData = parts) {
            url("http://192.168.0.111:3000/expenses/${expense.id}/receipts")
            method = HttpMethod.Post
        }
    }

    val launcher = rememberLauncherForActivityResult(
        contract =
        ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        imageUri = uri
    }


    Surface(color = shade000) {
        Column(Modifier.fillMaxSize()) {
            TopAppBar(
                title = {},
                backgroundColor = expense.user.first.color(),
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, "")
                    }
                },
                contentColor = shade900,
                elevation = 0.dp
            )
            Column(
                Modifier
                    .fillMaxWidth()
                    .background(expense.user.first.color())
                    .padding(15.dp)
            ) {
                Spacer(Modifier.height(80.dp))
                Text(expense.amount.formatted(), fontSize = TextUnit(16f, TextUnitType.Sp))
                Text(
                    expense.merchant,
                    fontSize = TextUnit(24f, TextUnitType.Sp),
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    expense.date.toDate().formatToServerDateDefaults(),
                    fontSize = TextUnit(13f, TextUnitType.Sp)
                )
            }
            TextField(
                value = note,
                placeholder = { Text("Note...") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp),
                colors = TextFieldDefaults.textFieldColors(
                    backgroundColor = shade000,
                    focusedIndicatorColor = shade000,
                    unfocusedIndicatorColor = shade000
                ),
                onValueChange = {
                    note = it
                })
            LazyRow {

                items(expense.receipts) { receipt ->
                    Image(
                        painter = rememberImagePainter(
                            data = "http://192.168.0.111:3000${receipt.url!!}",
                        ),
                        contentDescription = null,
                        modifier = Modifier
                            .size(150.dp)
                            .padding(horizontal = 10.dp)
                    )
                }

                item {
                    Box(
                        Modifier
                            .padding(start = 22.dp)
                            .size(150.dp)
                            .background(shade400),
                        Alignment.Center
                    ) {
                        IconButton({
                            launcher.launch("image/*")
                        }) {
                            Icon(Icons.Default.Add, "", Modifier.size(25.dp))
                        }
                    }
                }
            }
        }
    }
}