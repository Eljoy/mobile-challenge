package com.mobilechallenge

import android.net.Uri
import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.mobilechallenge.components.Avatar
import com.mobilechallenge.models.Amount
import com.mobilechallenge.models.Expense
import java.io.File
import java.util.concurrent.Executor
import java.util.concurrent.Executors

@Composable
fun ReceiptCameraView(
  outputDirectory: File,
  executor: Executor,
  onImageCaptured: (uri: Uri, fileName: String) -> Unit,
  expense: Expense
) {
  CameraView(
    outputDirectory = outputDirectory,
    executor = executor,
    onImageCaptured = onImageCaptured,
    onError = { Log.e("ReceiptCameraView", "View error:", it) },
  ) { takePhoto ->
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
      OutlinedButton(
        shape = CircleShape,
        modifier = Modifier
          .size(115.dp)
          .padding(25.dp),
        contentPadding = PaddingValues(0.dp),
        colors = ButtonDefaults.buttonColors(
          backgroundColor = Color.White,
          contentColor = Color.White
        ),
        onClick = {
          takePhoto()
        }
      ) {}
      Card(
        elevation = 10.dp, modifier = Modifier
          .fillMaxWidth()
      ) {
        Row(
          modifier = Modifier
            .padding(20.dp)
            .fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          Row {
            Avatar(name = expense.merchant)
            Column(modifier = Modifier.padding(start = 10.dp, end = 10.dp)) {
              Text(text = expense.merchant)
            }
          }
          Text(text = expense.amount.value + expense.amount.currency)
        }
      }
    }
  }
}

@Preview
@Composable
fun ReceiptCameraView_Preview() {
  val cameraExecutor = Executors.newSingleThreadExecutor()
  val context = LocalContext.current
  val amount = Amount(value = "3,90", currency = "EUR")
  val expense = Expense(
    id = "0",
    merchant = "Starbucks",
    amount = amount,
    date = "Sun Jul 31 2022 23:39:24 GMT+0400 (Armenia Standard Time)"
  )

  ReceiptCameraView(
    onImageCaptured = { _, _ -> },
    executor = cameraExecutor,
    outputDirectory = context.filesDir,
    expense = expense
  )
}