// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use serde::Serialize;
use std::ptr;
use tauri::Window;
use winapi::shared::windef::RECT;
use winapi::um::winuser::{FindWindowW, GetWindowRect, SetCursorPos};

#[derive(Serialize)]
struct WindowRect {
    left: i32,
    top: i32,
    right: i32,
    bottom: i32,
}

#[tauri::command]
fn set_cursor_pos(x: i32, y: i32) {
    unsafe {
        if SetCursorPos(x, y) == 0 {
            panic!("Failed to set cursor position");
        } else {
            println!("Cursor position set to ({}, {})", x, y);
        }
    }
}

#[tauri::command]
fn get_window_rect(window: Window) -> WindowRect {
    let title = window.title().unwrap_or_else(|_| "".to_string());
    let title_wide: Vec<u16> = title.encode_utf16().chain(std::iter::once(0)).collect();

    unsafe {
        let hwnd = FindWindowW(ptr::null(), title_wide.as_ptr());
        if hwnd.is_null() {
            return WindowRect {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            };
        }
        let mut rect: RECT = RECT {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
        };
        if GetWindowRect(hwnd, &mut rect) != 0 {
            return WindowRect {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
            };
        } else {
            WindowRect {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            }
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_cursor_pos, get_window_rect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
