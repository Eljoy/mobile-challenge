package io.pleo.challange

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.*
import io.pleo.challange.ui.theme.color

@ExperimentalUnitApi
@Composable
fun ExpenseRow(expense: Expense, onPress: () -> Unit) {
    Row(
        Modifier
            .clickable(
                interactionSource = remember { MutableInteractionSource() },
                indication = rememberRipple(),
                onClick = onPress
            )
            .padding(5.dp), verticalAlignment = Alignment.CenterVertically
    ) {
        Box(Modifier.padding(horizontal = 8.dp), contentAlignment = Alignment.Center) {
            Box(
                Modifier
                    .size(42.dp)
                    .clip(CircleShape)
                    .background(expense.user.first.color())
            ) {}
            Text(expense.user.first.first().toString(), fontSize = TextUnit(18f, TextUnitType.Sp))
        }
        Column(Modifier.weight(1f)) {
            Text(expense.merchant)
            Text(expense.user.fullName(), fontSize = TextUnit(12f, TextUnitType.Sp))
        }
        Column(horizontalAlignment = Alignment.End) {
            Text(expense.amount.formatted())
            Text(
                expense.date.toDate().formatToServerDateDefaults(),
                fontSize = TextUnit(12f, TextUnitType.Sp)
            )
        }
    }
}
