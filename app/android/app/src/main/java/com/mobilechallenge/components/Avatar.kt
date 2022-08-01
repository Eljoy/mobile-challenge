package com.mobilechallenge.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun Avatar(name: String) {
  Box(
    modifier = Modifier
      .size(45.dp)
      .clip(CircleShape)
      .background(Color(0xFF61D286)),
  ) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      verticalArrangement = Arrangement.Center,
      modifier = Modifier.fillMaxSize()
    ) {
      Text(
        text = name[0].uppercaseChar().toString(),
        color = Color.White,
        fontSize = 20.sp,
        lineHeight = 20.sp
      )
    }
  }
}

@Preview
@Composable
fun Avatar_preview() {
  Avatar(name = "Jacob")
}