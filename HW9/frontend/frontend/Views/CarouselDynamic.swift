//
//  CarouselDynamic.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/19.
//

import SwiftUI
import Combine

struct CarouselDynamic<Content: View>: View {
        private var numberOfImages: Int
        private var content: Content   // a reference to what images are going to be displayed

        @State private var currentIndex: Int = 0  // to keep track of our current index of which image is to be shown
        
        private let timer = Timer.publish(every: 3, on: .main, in: .common).autoconnect()

        init(numberOfImages: Int, @ViewBuilder content: () -> Content) {
            self.numberOfImages = numberOfImages
            self.content = content()
        }

        var body: some View {
            GeometryReader { geometry in
                HStack(spacing: 7) {
                    self.content
                }
                .frame(width: geometry.size.width, height: geometry.size.height, alignment: .leading)
                .offset(x: CGFloat(self.currentIndex) * -geometry.size.width, y: 0)
                .animation(.spring())
                .onReceive(self.timer) { _ in
                    
                    self.currentIndex = (self.currentIndex + 1) % self.numberOfImages
                }
            }
        }
}

