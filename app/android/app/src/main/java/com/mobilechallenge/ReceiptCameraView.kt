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
import androidx.compose.ui.unit.sp
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
          Avatar(name = expense.merchant)
          Column(
            modifier = Modifier.padding(start = 20.dp, end = 10.dp),
            verticalArrangement = Arrangement.Center
          ) {
            Row(
              modifier = Modifier.fillMaxWidth(),
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.SpaceBetween,
            ) {
              Text(
                text = expense.merchant,
                fontSize = 15.sp,
                lineHeight = 16.sp,
                color = Color.Black
              )
              Text(
                text = expense.amount.value + expense.amount.currency,
                color = Color.Black,
                fontSize = 15.sp
              )
            }
            Spacer(modifier = Modifier.height(1.dp))
            Text(text = expense.formattedDate, fontSize = 13.sp, color = Color.LightGray)
          }
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
    formattedDate = "Jul 31 2022 23:39:24"
  )

  ReceiptCameraView(
    onImageCaptured = { _, _ -> },
    executor = cameraExecutor,
    outputDirectory = context.filesDir,
    expense = expense
  )
}