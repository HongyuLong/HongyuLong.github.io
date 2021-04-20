//
//  HomeNavigationBar.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/19.
//

import SwiftUI

private let KLabelWidth: CGFloat = 80
private let KButtonHeight: CGFloat = 60

struct HomeNavigationBar: View {
    var body: some View {
        NavigationView {
            Text("Hello, World!").padding()
                .toolbar {
                    ToolbarItemGroup(placement: .bottomBar) {
                        
                        Spacer()
                        
                        Button("Search") {
                            print("Pressed")
                        }

                        Spacer()

                        Button("Home") {
                            print("Pressed")
                        }
                        
                        Spacer()

                        Button("WatchList") {
                            print("Pressed")
                        }
                        
                        Spacer()
                    }
                }
                
        }
    }
}

struct HomeNavigationBar_Previews: PreviewProvider {
    static var previews: some View {
        HomeNavigationBar()
    }
}
