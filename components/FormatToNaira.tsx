import React from "react"
import { StyleProp, TextStyle } from "react-native";
import { Text } from "./Themed"

type NairaProps = {
    children: number;
    style?: StyleProp<TextStyle>
}

const Naira = ({ children, style }: NairaProps) => {
    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 })

    return (
        <Text style={style}>&#x20a6;{formatter.format(children)}</Text>
    )
}

export default Naira