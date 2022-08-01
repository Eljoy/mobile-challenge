package com.mobilechallenge


import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import com.google.gson.Gson
import com.mobilechallenge.models.Expense
import java.io.File
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class ReceiptCameraActivity : AppCompatActivity() {
  private lateinit var outputDirectory: File
  private lateinit var cameraExecutor: ExecutorService

  private fun handleImageCapture(uri: Uri, fileName: String) {
    Log.i("ReceiptCameraActivity", "Image captured: $uri")
    val resultIntent = Intent()
    resultIntent.putExtra("uri", uri.toString())
    resultIntent.putExtra("fileName", fileName)
    setResult(RESULT_OK, resultIntent)
    finish()
  }

  private fun getOutputDirectory(): File {
    val mediaDir = externalMediaDirs.firstOrNull()?.let {
      File(it, resources.getString(R.string.app_name)).apply { mkdirs() }
    }

    return if (mediaDir != null && mediaDir.exists()) mediaDir else filesDir
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val intent = intent
    outputDirectory = getOutputDirectory()
    cameraExecutor = Executors.newSingleThreadExecutor()
    val gson = Gson()
    val expenseJSON = intent.getStringExtra("expenseJSON")
    val expense: Expense = gson.fromJson(expenseJSON, Expense::class.java)
    setContent {
      ReceiptCameraView(
        outputDirectory = outputDirectory,
        executor = cameraExecutor,
        onImageCaptured = ::handleImageCapture,
        expense = expense
      )
    }
  }

  override fun onDestroy() {
    super.onDestroy()
    cameraExecutor.shutdown()
  }
}