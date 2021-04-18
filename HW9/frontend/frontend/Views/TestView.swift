//
//  TestView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/16.
//

import SwiftUI

struct TestView: View {
    var body: some View {
        Button(action: { print("Hello world!") }) {
            Text("Click me!")
        }
    }
}

struct TestView_Previews: PreviewProvider {
    static var previews: some View {
        TestView()
    }
}
